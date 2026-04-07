// Infrastructure Layer - Generic Lowdb Repository Implementation
// Implements repository interfaces using a generic approach to avoid duplication

import { Low, JSONFile } from 'lowdb'
import { Entity, entityToPlainObject, plainObjectToEntity } from '../domain/entities.ts'
import path from 'path'
import fs from 'fs/promises'

// Generic base repository with common CRUD operations
export class LowdbRepository<T extends Entity> {
  protected db: Low<{ items: T[] }>
  
  constructor(private filePath: string) {
    const adapter = new JSONFile<{ items: T[] }>(filePath)
    this.db = new Low(adapter)
    this.initialize().catch(console.error)
  }

  protected async initialize(): Promise<void> {
    await this.db.read()
    this.db.data ||= { items: [] }
    await this.ensureDataDirectory()
  }
  
  protected async ensureDataDirectory(): Promise<void> {
    const dir = path.dirname(this.filePath)
    try {
      await fs.mkdir(dir, { recursive: true })
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        console.error(`Failed to create data directory for ${this.filePath}:`, error)
      }
    }
  }
  
  public async getAllItems(): Promise<T[]> {
    await this.db.read()
    return this.db.data?.items.map(plainObjectToEntity) ?? []
  }
  
  public async findById(id: string): Promise<T | null> {
    await this.db.read()
    const item = this.db.data?.items.find(item => item.id === id) ?? null
    return plainObjectToEntity(item)
  }
  
  public async saveItem(item: T): Promise<void> {
    await this.db.read()
    if (!this.db.data) {
      throw new Error("Database not initialized")
    }
    
    const index = this.db.data.items.findIndex(existing => existing.id === item.id)
    const poItem = entityToPlainObject(item)
    
    if (index >= 0) {
      this.db.data.items[index] = poItem
    } else {
      this.db.data.items.push(poItem)
    }
    
    await this.db.write()
  }
  
  public async deleteById(id: string): Promise<void> {
    await this.db.read()
    if (!this.db.data) {
      throw new Error("Database not initialized")
    }
    
    this.db.data.items = this.db.data.items.filter(item => item.id !== id)
    await this.db.write()
  }
}
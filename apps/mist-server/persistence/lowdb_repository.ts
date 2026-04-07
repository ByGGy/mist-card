// Infrastructure Layer - Generic Lowdb Repository Implementation
// Implements repository interfaces using a generic approach to avoid duplication

import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { Entity, entityToPlainObject, plainObjectToEntity } from '../domain/entities.ts'
import path from 'path'
import fs from 'fs'

type Data<T extends Entity> = {
  items: T[]
}

// Generic base repository with common CRUD operations
export class LowdbRepository<T extends Entity> {
  private readonly filePath: string
  private readonly db: LowSync<Data<T>>
  
  constructor(filePath: string) {
    this.filePath = filePath
    this.ensureDataDirectory()

    const adapter = new JSONFileSync<Data<T>>(this.filePath)

    const defaultData: Data<T> = { items: [] }
    this.db = new LowSync(adapter, defaultData)
    this.db.read()
  }

  private ensureDataDirectory() {
    const dir = path.dirname(this.filePath)
    try {
      fs.mkdirSync(dir, { recursive: true })
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        console.error(`Failed to create data directory for ${this.filePath}:`, error)
      }
    }
  }
  
  public async getAllItems(): Promise<T[]> {
    return this.db.data.items.map(plainObjectToEntity) as T[]
  }
  
  public async findById(id: string): Promise<T | null> {
    const item = this.db.data.items.find(item => item.id === id)
    return plainObjectToEntity(item) as T | null
  }
  
  public async saveItem(item: T): Promise<void> {   
    const index = this.db.data.items.findIndex(existing => existing.id === item.id)
    const poItem = entityToPlainObject(item)
    
    if (index >= 0) {
      this.db.data.items[index] = poItem
    } else {
      this.db.data.items.push(poItem)
    }

    this.db.write()
  }
  
  public async deleteById(id: string): Promise<void> {    
    this.db.data.items = this.db.data.items.filter(item => item.id !== id)
    this.db.write()
  }
}
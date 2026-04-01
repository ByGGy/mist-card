extends Node

func _ready():
	print("starting script")
	fetch_games()
	
func fetch_games():
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self.onFetchGamesComplete)
	
	var error = http_request.request("http://localhost:3000/api/games", [], HTTPClient.METHOD_GET)
	if error != OK:
		print("Error fetching games: ", error)
		return
	
func onFetchGamesComplete(result, response_code, headers, body):
	if response_code == 200:
		var json = JSON.new()
		json.parse(body.get_string_from_utf8())
		var games = json.get_data()
		print("Fetched games:", games)
		fetch_cards(games[0].id)
		return games
	else:
		print("Error fetching games: HTTP status ", response_code)
		return []

func fetch_cards(gameId):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self.onFetchCardsComplete)
	
	var error = http_request.request("http://localhost:3000/api/games/%s/cards" % gameId, [], HTTPClient.METHOD_GET)
	if error != OK:
		print("Error fetching cards: ", error)
		return
	
func onFetchCardsComplete(result, response_code, headers, body):
	if response_code == 200:
		var json = JSON.new()
		json.parse(body.get_string_from_utf8())
		var cards = json.get_data()
		print("Fetched cards:", cards)
		self.text = "cards found: %d" %cards.size()
		return cards
	else:
		print("Error fetching cards: HTTP status ", response_code)
		return []

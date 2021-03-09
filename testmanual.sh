curl -X POST -H "Content-Type: application/json" --data '{"searchstring": "test"}' http://localhost:3000/search

curl -X POST -H "Content-Type: application/json" --data '{"searchstring": "test", "token": "CAwQAA"}' http://localhost:3000/next

curl -X POST -H "Content-Type: application/json" --data '{"searchstring": "test", "token": "CBgQAA"}' http://localhost:3000/previous

#!/bin/bash
echo "Testing Login..."
curl -v -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"testadmin@store.com","password":"password123"}'
echo "Done."

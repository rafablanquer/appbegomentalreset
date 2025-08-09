curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
   -d '{
    "name": "Admin User",
    "email": "rbr2@test.es",
    "password": "123456Aa"
  }'
 

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
   -d '{
    "name": "Bego Tester",
    "email": "bego@test.es",
    "password": "123456Aa"
  }'
 


 curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
   -d '{
    "name": "Vanessa Tester",
    "email": "vanessa@test.es",
    "password": "123456Aa"
  }'
 
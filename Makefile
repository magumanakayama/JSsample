d_u:
	@docker compose up -d --build

d_d:
	@docker compose down

d_eb:
	@docker exec -it node_backend bash

d_ef:
	@docker exec -it node_frontend bash

d_p:
	@docker ps

curl_3000:
	@curl http://localhost:3000


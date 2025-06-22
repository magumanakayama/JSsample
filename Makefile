d_u:
	@docker compose up -d --build front

d_d:
	@docker compose down

d_e:
	@docker exec -it my_front bash
# docker exec -it -u 0 my_front bash

d_e_c:
	@docker exec -it node bash -c "cd ./nodejsbook/CLI && bash"

d_p:
	@docker ps

curl_3000:
	@curl http://localhost:3000


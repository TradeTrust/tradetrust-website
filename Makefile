.PHONY: run
.ONESHELL:
run:
	@ docker-compose up --build --remove-orphans


.PHONY: stop
.ONESHELL:
stop:
	@ docker-compose down


.PHONY: clean
.ONESHELL:
clean:
	@ docker-compose down --rmi all --volumes


.PHONY: build
.ONESHELL:
build:
	@ docker-compose build --no-cache


.PHONY: shell-website
.ONESHELL:
shell-website:
	@ docker-compose exec website /bin/bash

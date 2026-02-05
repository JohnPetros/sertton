.PHONY: run build clean test release

run:
	flutter run

build:
	flutter build appbundle --dart-define=ENV_FILE=.env

test:
	flutter test

clean:
	flutter clean

VERSION := $(word 2,$(MAKECMDGOALS))

%:
	@:

release:
	@if [ -z "$(VERSION)" ]; then \
		echo "Uso: make release 1.2.3"; \
		exit 1; \
	fi

	@if git rev-parse "v$(VERSION)" >/dev/null 2>&1; then \
		echo "Tag v$(VERSION) já existe"; \
		exit 1; \
	fi

	@echo "Criando tag v$(VERSION)..."
	git tag v$(VERSION)

	@echo "Enviando tag para origin..."
	git push origin v$(VERSION)

	@echo "Release v$(VERSION) publicada com sucesso!"

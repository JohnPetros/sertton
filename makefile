release:
	@if [ -z "$(VERSION)" ]; then \
		echo "Uso: make release 1.2.3"; \
		exit 1; \
	fi

	@if ! echo "$(VERSION)" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$$'; then \
		echo "Versao invalida: $(VERSION). Use X.Y.Z (ex: 1.2.3)"; \
		exit 1; \
	fi

	@if git rev-parse "v$(VERSION)" >/dev/null 2>&1; then \
		echo "Tag v$(VERSION) ja existe"; \
		exit 1; \
	fi

	@echo "Atualizando versao no pubspec.yaml para $(VERSION)..."
	@sed -i.bak "s/^version: .*/version: $(VERSION)/" pubspec.yaml
	@rm -f pubspec.yaml.bak

	@echo "Commitando alteracoes..."
	@git add -A
	@if git diff --cached --quiet; then \
		echo "Nada para commitar"; \
		exit 1; \
	fi
	@git commit -m "🔖 release: version $(VERSION)"

	@echo "Enviando codigo para origin..."
	@git push origin HEAD

	@echo "Criando tag v$(VERSION)..."
	@git tag v$(VERSION)

	@echo "Enviando tag para origin..."
	@git push origin v$(VERSION)

	@echo "Release v$(VERSION) publicada com sucesso!"

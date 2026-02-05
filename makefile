.PHONY: run build clean test

run:
	flutter run

build:
	flutter build appbundle --dart-define=ENV_FILE=.env

test:
	flutter test

clean:
	flutter clean

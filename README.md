# 16.01.24

## Co działa:

- Komponent do tworzenia notatek,
- Baza danych (id, title, text, date),
- Komponent wyświetlający listę notatek,
- Usuwanie notatek w powyższym komponencie.

## Z czym są problemy:

- CORS krzyczy, teraz jest ustawione allowalorigins, ale przy credentials działa i daje error, bądź tu mądry,
- Ogólnie CSS, a może jego brak.

# 17.01.24

- Dodałem modala do edycji notatki,
- Zmieniłem noteText na noteDate w HTMLu komponentu ListNotes

# 18.01.24

- Dodałem CSS do CreateNote.js w pliku custom.css, problem z overflowem `noteText` i w innych miejscach, muszę pokombinować z wysokościami,
- Edit jest jedyną opcją żeby zobaczyć notatkę,
- Brakuje trybu ciemnego,
- Modal nie jest idealny, patrz czwarte zdjęcie i zbyteczna ramka,

## Create note page, where user add new note and save it to DB:
![Zrzut ekranu 2024-01-18 211142](https://github.com/Rolleksy/ReactNotesASP/assets/91317977/efded60d-9c4f-4d02-b4d4-133e83573d54)

## Example:
![Zrzut ekranu 2024-01-18 211226](https://github.com/Rolleksy/ReactNotesASP/assets/91317977/a77a7e41-1117-4fc3-ae82-a8081156cf0c)

## List of notes fetched from DB. User can edit/show note or delete it:
![Zrzut ekranu 2024-01-18 211240](https://github.com/Rolleksy/ReactNotesASP/assets/91317977/ae627bbe-f643-4243-aa85-4c4efdc689df)

## Modal used to show and edit notes
![Zrzut ekranu 2024-01-18 211251](https://github.com/Rolleksy/ReactNotesASP/assets/91317977/1cf5cce2-278c-4539-8e92-82b8c968f4b4)

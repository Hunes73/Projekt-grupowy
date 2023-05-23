# Jak to uruchomić?

1. Możliwe że IntelliJ nie wykryje projektu, trzeba ustawić manualnie katalogi źródłowe i testowe.

   Sources: `src/main/java`

   Test Sources: `src/test/java`

   Resources: `src/main/resources`

   Excluded: `target`

2. Możliwe że IntelliJ nie wykryje Mavena, wtedy trzeba go dodać w ustawieniach projektu.

   `Project -> Programowanie-zespołowe-IX na górze -> Add Framework Support -> Maven`

   Może trzeba będzie przeładować Mavena.

3. W postgresie utwórz baze danych o nazwie `logowanie`
4. W pliku `application.properties` ustaw swoje dane do bazy danych
5. W pliku `application.properties` ustaw spring.jpa.hibernate.ddl-auto na `create`
6. W pliku `application.properties` zakomentuj linię `spring.sql.init.mode=always`
7. Uruchom aplikację po raz pierwszy
8. Odkomentuj linię `spring.sql.init.mode=always`
9. W pliku `application.properties` ustaw spring.jpa.hibernate.ddl-auto na `update`
10. Uruchom aplikację po raz drugi
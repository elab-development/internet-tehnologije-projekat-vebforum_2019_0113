# PROJEKAT WEB FORUM IZ PREDMETA ITEHA
Aleksandra Njegovan 0113/2019
Ivana Jankovic 0327/2016

# OPIS APLIKACIJE
 Potrebno je kreirati aplikaciju koja predstavlja veb forum. Aplikacija treba da omogući tri korisničke uloge: 
1.	Neulogovani korisnik
2.	Ulogovani korisnik
3.	Administrator

Za korisnika koji nije ulogovan je potrebno oomogućiti pregled početne stranice, kao i stranice na kojoj korisnici mogu da vide popularne Reddit objave koje se učitavaju uz pomoć ReditAPI-ja. Neulogovani korisnici imaju mogućnost kreiranja naloga ili prijave na sistem. 

Kada se korisnik uloguje, njemu se otvara stranica na kojoj može da vidi sve objave koje su kreirane. Ove objave korisnik može da pretražuje, filtrira po temi, a na ovoj stranici je potrebno kreirati i paginaciju. Korisnici koji su ulogovani mogu da kreiraju objave za određene teme, a takođe mogu i da diskutuju o trenutnim objavama, da ostavljaju komentare na objave drugih korisnika, kao i da označe da im se neka objava sviđa ili ne sviđa. 

Administratori imaju mogućnost pregleda svih tema koje postoje na forumu, kao i mogućnost brisanja određene teme ukoliko nije primerena ili mogućnost kreiranja nove teme. Kako bi administratori poboljšali rad same platforme, neophodno je obezbediti i admin panel na kom će moći da pregledaju statistike u vezi sa temama, objavama i korisnicima.

# UPUTSTVO ZA PREUZIMANJE 

## Laravel

    cd webforum
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve
    
## React

    cd webforumfront
    npm install
    npm start

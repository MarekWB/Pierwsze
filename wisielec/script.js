//	var randomWordArray;
//$.ajax({
//	url: 'https://api.myjson.com/bins/plkce',
//	dataType: 'json',
//	success: function (data) {
//		$(data.words).each (function(index,value) {
//			randomWordArray=value.words;
//		});
//	}
//});
var randomWordArray//=["Bombaj","cymbałki"];
var randomWord;
var tries; //ustawiam liczbę podejść na 1,5 razy długości hasła
var z; //pusta zmienna na później, do wyświetlenia odkrywanego hasłą
var count = 0; //zmienna licząca ilość podejść
var answerArray = []; //tablica na litery

function startUp (){
		
	var url = 'https://opentable.herokuapp.com/api/cities';
    var rslt = false;
    $.ajax({
     async: false,
     url: url,
     dataType: "json",
     success: function(data) {
       randomWordArray = data.cities;
     }
    });

	randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)]; //losuję hasło
	tries = Math.ceil(randomWord.length*1.5); //ustawiam liczbę podejść na 1,5 razy długości hasła
	for (var i = 0; i < randomWord.length; i++)
	{
		answerArray[i] = "_"; //miejsce na literę
	}
	
	z = answerArray.join(" "); //łączenie hasła GUI
	document.getElementById("answer").innerHTML = z; //pokazywanie miejsca na hasło
	document.getElementById("counter").innerHTML="Błędnych trafień: " + count + " z " + tries; //komunikat o ilości prób
	};

function Gra() {
	var letter = document.getElementById("letter").value; //wartość inputu
	var lowLetter = letter.toLowerCase();
	var uppLetter = letter.toUpperCase();

	//var regex = /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/; //dopuszczalne znaki
	var good = false; //zmienna na później do regulacji ilości wykorzystanych prób
	if (letter.length == 1)// && letter.match(regex))//sprawdzam ilość i zawartość inputu

	{
		for (var i = 0; i < randomWord.length; i++) //dodanie inputu do hasła według indeksu
		{

			if (randomWord[i] === letter) 
			{
				answerArray[i]=letter; //wpasowanie inputu w odpowiednie miejsce
				good = true; // oznaczenie odpowiedzi jako poprawnej
			} 
			if (randomWord[i] === lowLetter) 
			{
				answerArray[i]=lowLetter; //wpasowanie inputu w odpowiednie miejsce
				good = true; // oznaczenie odpowiedzi jako poprawnej
			}
			if (randomWord[i] === uppLetter) 
			{
				answerArray[i]=uppLetter; //wpasowanie inputu w odpowiednie miejsce
				good = true; // oznaczenie odpowiedzi jako poprawnej
			}
		}
	if (good!=true) 
	{		
		count++ ; //wzrost ilości wykorzystanych prób przy niepoprawnej odpowiedzi
		
		};
	var good = false;
	document.getElementById("counter").innerHTML="Błędnych trafień: " + count + " z " + tries; //komunikat o ilości prób
	document.getElementById("answer").innerHTML=answerArray.join(" "); //złączenie
	document.getElementById("letter").value=''; //opróżnienie input boxa
	} 
	var win =answerArray.includes("_") //sprawdzam, czy hasło nie jest jeszcze uzupełnione
	if (win===false) {
		document.getElementById("stat").innerHTML="Wygrałeś!"; //komunikat o rezultacie
		document.getElementById("gra-button").disabled=true; //wyłączenie przycisku
		document.getElementById("letter").disabled=true; //wyłączenie pola input
	} else if (count>=tries) {
		document.getElementById("stat").innerHTML="Przegrałeś!"; //komunikat o rezultacie
		document.getElementById("gra-button").disabled=true; //wyłączenie przycisku
		document.getElementById("letter").disabled=true; //wyłączenie pola input
		alert("Hasło to: " + randomWord);
	}
	var kat = (count/tries)*100;//ustalam procentowy postęp porażki, by wprowadzać odpowiednią ilustrację szubienicy
	if (kat>1 && kat<=10) {
		document.getElementById("szubienica").src="images/szubienica2.png";
	} else if (kat>10 && kat<=20) {
		document.getElementById("szubienica").src="images/szubienica3.png";
	} else if (kat>20 && kat<=30) {
		document.getElementById("szubienica").src="images/szubienica4.png";
	} else if (kat>30 && kat<=40) {
		document.getElementById("szubienica").src="images/szubienica5.png";
	} else if (kat>40 && kat<=50) {
		document.getElementById("szubienica").src="images/szubienica6.png";
	} else if (kat>50 && kat<=60) {
		document.getElementById("szubienica").src="images/szubienica7.png";
	} else if (kat>60 && kat<=70) {
		document.getElementById("szubienica").src="images/szubienica8.png";
	} else if (kat>70 && kat<=80) {
		document.getElementById("szubienica").src="images/szubienica9.png";
	} else if (kat>80 && kat<100) {
		document.getElementById("szubienica").src="images/szubienica10.png";
	} else if (kat>=100) {
		document.getElementById("szubienica").src="images/szubienica11.png";
	}
};	

function Reset () {
	count=0;
	document.getElementById("counter").innerHTML=""; //resetuję counter
	document.getElementById("stat").innerHTML=""; //resetuje statement
	document.getElementById("gra-button").disabled=false; //włączam przycik gry
	document.getElementById("letter").disabled=false; //włączam pole input
	document.getElementById("szubienica").src="images/szubienica1.png"; //startowa szubienica
	startUp(); //losuję i ustawiam kolejne hasło
}; //przycisk resetujący grę

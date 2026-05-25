const movies = [
  // ===== Hand-written realistic movies =====
  { title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", release_year: 1994, genre: "Drama", rating: 9.3, duration: 142, director: "Frank Darabont" },
  { title: "The Godfather", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.", release_year: 1972, genre: "Crime", rating: 9.2, duration: 175, director: "Francis Ford Coppola" },
  { title: "The Dark Knight", description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests to fight injustice.", release_year: 2008, genre: "Action", rating: 9.0, duration: 152, director: "Christopher Nolan" },
  { title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.", release_year: 1994, genre: "Crime", rating: 8.9, duration: 154, director: "Quentin Tarantino" },
  { title: "Forrest Gump", description: "The presidencies of Kennedy and Johnson and other historical events unfold through the perspective of an Alabama man.", release_year: 1994, genre: "Drama", rating: 8.8, duration: 142, director: "Robert Zemeckis" },
  { title: "Inception", description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.", release_year: 2010, genre: "Sci-Fi", rating: 8.8, duration: 148, director: "Christopher Nolan" },
  { title: "The Matrix", description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.", release_year: 1999, genre: "Sci-Fi", rating: 8.7, duration: 136, director: "Lana Wachowski" },
  { title: "Goodfellas", description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.", release_year: 1990, genre: "Crime", rating: 8.7, duration: 146, director: "Martin Scorsese" },
  { title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", release_year: 2014, genre: "Sci-Fi", rating: 8.6, duration: 169, director: "Christopher Nolan" },
  { title: "The Silence of the Lambs", description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.", release_year: 1991, genre: "Thriller", rating: 8.6, duration: 118, director: "Jonathan Demme" },
  { title: "Saving Private Ryan", description: "Following the Normandy landings, a group of soldiers go behind enemy lines to retrieve a paratrooper.", release_year: 1998, genre: "Drama", rating: 8.6, duration: 169, director: "Steven Spielberg" },
  { title: "Gladiator", description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.", release_year: 2000, genre: "Action", rating: 8.5, duration: 155, director: "Ridley Scott" },
  { title: "The Lion King", description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.", release_year: 1994, genre: "Animation", rating: 8.5, duration: 88, director: "Roger Allers" },
  { title: "Jurassic Park", description: "A pragmatic paleontologist visiting an almost complete theme park on an island is tasked with protecting kids.", release_year: 1993, genre: "Adventure", rating: 8.2, duration: 127, director: "Steven Spielberg" },
  { title: "Titanic", description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious ill-fated R.M.S. Titanic.", release_year: 1997, genre: "Romance", rating: 7.9, duration: 194, director: "James Cameron" },
  { title: "The Avengers", description: "Earth's mightiest heroes must come together to stop the mischievous Loki and his alien army.", release_year: 2012, genre: "Action", rating: 8.0, duration: 143, director: "Joss Whedon" },
  { title: "Toy Story", description: "A cowboy doll is profoundly threatened when a new spaceman figure supplants him as top toy in a boy's room.", release_year: 1995, genre: "Animation", rating: 8.3, duration: 81, director: "John Lasseter" },
  { title: "Finding Nemo", description: "After his son is captured in the Great Barrier Reef, a timid clownfish sets out on a journey to bring him home.", release_year: 2003, genre: "Animation", rating: 8.2, duration: 100, director: "Andrew Stanton" },
  { title: "The Departed", description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.", release_year: 2006, genre: "Crime", rating: 8.5, duration: 151, director: "Martin Scorsese" },
  { title: "Django Unchained", description: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.", release_year: 2012, genre: "Western", rating: 8.4, duration: 165, director: "Quentin Tarantino" },
  { title: "Up", description: "By tying thousands of balloons to his house, an elderly widower sets out to fulfill his dream of adventure.", release_year: 2009, genre: "Animation", rating: 8.3, duration: 96, director: "Pete Docter" },
  { title: "The Truman Show", description: "An insurance salesman discovers his whole life is actually a reality TV show.", release_year: 1998, genre: "Comedy", rating: 8.2, duration: 103, director: "Peter Weir" },
  { title: "Braveheart", description: "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward.", release_year: 1995, genre: "Action", rating: 8.4, duration: 178, director: "Mel Gibson" },
  { title: "Alien", description: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.", release_year: 1979, genre: "Horror", rating: 8.5, duration: 117, director: "Ridley Scott" },
  { title: "The Shining", description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.", release_year: 1980, genre: "Horror", rating: 8.4, duration: 146, director: "Stanley Kubrick" },
  { title: "Back to the Future", description: "A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend.", release_year: 1985, genre: "Sci-Fi", rating: 8.5, duration: 116, director: "Robert Zemeckis" },
  { title: "Blade Runner", description: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth.", release_year: 1982, genre: "Sci-Fi", rating: 8.1, duration: 117, director: "Ridley Scott" },
  { title: "Rocky", description: "A small-time boxer gets a supremely rare chance to fight the world heavyweight champion in a bout.", release_year: 1976, genre: "Drama", rating: 8.1, duration: 120, director: "John G. Avildsen" },
  { title: "Jaws", description: "A giant great white shark arrives on the shores of a small island community throwing it into chaos.", release_year: 1975, genre: "Thriller", rating: 8.0, duration: 124, director: "Steven Spielberg" },
  { title: "The Exorcist", description: "When a girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.", release_year: 1973, genre: "Horror", rating: 8.1, duration: 122, director: "William Friedkin" },
  { title: "Schindler's List", description: "In German-occupied Poland, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.", release_year: 1993, genre: "Drama", rating: 9.0, duration: 195, director: "Steven Spielberg" },
  { title: "No Country for Old Men", description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars.", release_year: 2007, genre: "Thriller", rating: 8.2, duration: 122, director: "Joel Coen" },
  { title: "Whiplash", description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.", release_year: 2014, genre: "Drama", rating: 8.5, duration: 106, director: "Damien Chazelle" },
  { title: "The Grand Budapest Hotel", description: "A writer encounters the owner of an aging high-class hotel, who tells of his early years as a lobby boy.", release_year: 2014, genre: "Comedy", rating: 8.1, duration: 99, director: "Wes Anderson" },
  { title: "Mad Max Fury Road", description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland.", release_year: 2015, genre: "Action", rating: 8.1, duration: 120, director: "George Miller" },
  { title: "Parasite", description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", release_year: 2019, genre: "Thriller", rating: 8.5, duration: 132, director: "Bong Joon-ho" },
  { title: "Get Out", description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him reaches a boiling point.", release_year: 2017, genre: "Horror", rating: 7.7, duration: 104, director: "Jordan Peele" },
  { title: "La La Land", description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.", release_year: 2016, genre: "Musical", rating: 8.0, duration: 128, director: "Damien Chazelle" },
  { title: "The Wolf of Wall Street", description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker to his fall involving crime and corruption.", release_year: 2013, genre: "Comedy", rating: 8.2, duration: 180, director: "Martin Scorsese" },
  { title: "Coco", description: "Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather and legendary singer.", release_year: 2017, genre: "Animation", rating: 8.4, duration: 105, director: "Lee Unkrich" },
  { title: "Dunkirk", description: "Allied soldiers from Belgium, the British Empire, and France are surrounded by the German army and evacuated during a fierce battle.", release_year: 2017, genre: "Action", rating: 7.8, duration: 106, director: "Christopher Nolan" },
  { title: "Bohemian Rhapsody", description: "The story of the legendary British rock band Queen and lead singer Freddie Mercury.", release_year: 2018, genre: "Drama", rating: 7.9, duration: 134, director: "Bryan Singer" },
  { title: "Joker", description: "A mentally troubled standup comedian embarks on a downward spiral that leads to the creation of an iconic villain.", release_year: 2019, genre: "Crime", rating: 8.4, duration: 122, director: "Todd Phillips" },
  { title: "Spider-Man Into the Spider-Verse", description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals to stop a threat.", release_year: 2018, genre: "Animation", rating: 8.4, duration: 117, director: "Bob Persichetti" },
  { title: "Knives Out", description: "A detective investigates the death of a patriarch of an eccentric combative family.", release_year: 2019, genre: "Mystery", rating: 7.9, duration: 130, director: "Rian Johnson" },
  { title: "1917", description: "Two young British soldiers during World War I are given an impossible mission to deliver a message that will stop a deadly attack.", release_year: 2019, genre: "Drama", rating: 8.3, duration: 119, director: "Sam Mendes" },
  { title: "Everything Everywhere All at Once", description: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes.", release_year: 2022, genre: "Adventure", rating: 7.8, duration: 139, director: "Daniel Kwan" },
  { title: "Top Gun Maverick", description: "After more than thirty years of service, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.", release_year: 2022, genre: "Action", rating: 8.2, duration: 130, director: "Joseph Kosinski" },
  { title: "Dune", description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.", release_year: 2021, genre: "Sci-Fi", rating: 8.0, duration: 155, director: "Denis Villeneuve" },
  { title: "The Batman", description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family.", release_year: 2022, genre: "Action", rating: 7.8, duration: 176, director: "Matt Reeves" },
  { title: "Oppenheimer", description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", release_year: 2023, genre: "Drama", rating: 8.3, duration: 180, director: "Christopher Nolan" },
  { title: "Barbie", description: "Barbie suffers a crisis that leads her to question her world and her existence.", release_year: 2023, genre: "Comedy", rating: 6.8, duration: 114, director: "Greta Gerwig" },
  { title: "John Wick", description: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.", release_year: 2014, genre: "Action", rating: 7.4, duration: 101, director: "Chad Stahelski" },
  { title: "The Revenant", description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear.", release_year: 2015, genre: "Adventure", rating: 8.0, duration: 156, director: "Alejandro Gonzalez Inarritu" },
  { title: "Hereditary", description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.", release_year: 2018, genre: "Horror", rating: 7.3, duration: 127, director: "Ari Aster" },
  { title: "A Quiet Place", description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.", release_year: 2018, genre: "Horror", rating: 7.5, duration: 90, director: "John Krasinski" },
  { title: "The Shape of Water", description: "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature.", release_year: 2017, genre: "Fantasy", rating: 7.3, duration: 123, director: "Guillermo del Toro" },
  { title: "Arrival", description: "A linguist works with the military to communicate with alien lifeforms after mysterious spacecraft land around the world.", release_year: 2016, genre: "Sci-Fi", rating: 7.9, duration: 116, director: "Denis Villeneuve" },
  { title: "The Hateful Eight", description: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.", release_year: 2015, genre: "Western", rating: 7.8, duration: 168, director: "Quentin Tarantino" },
  { title: "Inside Out", description: "After young Riley is uprooted from her Midwest life, her emotions conflict on how best to navigate a new city and school.", release_year: 2015, genre: "Animation", rating: 8.1, duration: 95, director: "Pete Docter" },
  { title: "March of the Penguins", description: "A look at the annual journey of Emperor penguins as they march to their breeding ground.", release_year: 2005, genre: "Documentary", rating: 7.5, duration: 80, director: "Luc Jacquet" },
  { title: "Grease", description: "Good girl Sandy and greaser Danny fell in love over the summer but when they unexpectedly discover they are now in the same high school things get complicated.", release_year: 1978, genre: "Musical", rating: 7.2, duration: 110, director: "Randal Kleiser" },
  { title: "The Good the Bad and the Ugly", description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.", release_year: 1966, genre: "Western", rating: 8.8, duration: 178, director: "Sergio Leone" },
  { title: "Spirited Away", description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods and witches.", release_year: 2001, genre: "Animation", rating: 8.6, duration: 125, director: "Hayao Miyazaki" },
];

// ===== Now generate more movies to reach 1050+ =====

var genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation", "Documentary", "Fantasy", "Adventure", "Mystery", "Crime", "Musical", "Western"];

var directors = [
  "James Cameron", "Steven Spielberg", "Christopher Nolan", "Martin Scorsese",
  "Quentin Tarantino", "Ridley Scott", "David Fincher", "Denis Villeneuve",
  "Greta Gerwig", "Jordan Peele", "Wes Anderson", "Spike Lee",
  "Kathryn Bigelow", "Alfonso Cuaron", "Guillermo del Toro", "Peter Jackson",
  "Tim Burton", "Clint Eastwood", "Ron Howard", "Michael Bay",
  "Zack Snyder", "J.J. Abrams", "Sam Raimi", "Robert Rodriguez",
  "Coen Brothers", "Danny Boyle", "Paul Thomas Anderson", "Sofia Coppola",
  "Darren Aronofsky", "M. Night Shyamalan", "Guy Ritchie", "Edgar Wright",
  "Taika Waititi", "Barry Jenkins", "Chloe Zhao", "Ava DuVernay",
  "Ryan Coogler", "Damien Chazelle", "Lulu Wang", "Emerald Fennell"
];

var adjectives = [
  "Lost", "Forgotten", "Silent", "Dark", "Bright", "Hidden", "Broken",
  "Last", "Final", "Burning", "Frozen", "Golden", "Silver", "Iron",
  "Crimson", "Endless", "Eternal", "Fallen", "Rising", "Fading",
  "Hollow", "Sacred", "Wicked", "Wild", "Savage", "Gentle", "Lonely",
  "Fearless", "Reckless", "Ruthless", "Shattered", "Twisted", "Cursed",
  "Blessed", "Haunted", "Distant", "Ancient", "Modern", "Secret", "Toxic"
];

var nouns = [
  "Shadow", "Storm", "Dream", "Kingdom", "Empire", "Heart", "Soul",
  "Blade", "Crown", "Throne", "Fire", "Ice", "Thunder", "Lightning",
  "River", "Mountain", "Ocean", "Desert", "Forest", "City",
  "Night", "Dawn", "Dusk", "Horizon", "Abyss", "Void", "Echo",
  "Ghost", "Wolf", "Eagle", "Serpent", "Phoenix", "Dragon", "Raven",
  "Hunter", "Warrior", "Knight", "Stranger", "Wanderer", "Prophet"
];

var titlePrefixes = [
  "The", "A", "Return of the", "Rise of the", "Fall of the",
  "Legend of the", "Tale of the", "Chronicles of the", "Path of the",
  "Beyond the", "Curse of the", "Wrath of the", "Song of the",
  "Revenge of the", "Secret of the"
];

var descriptionTemplates = [
  "A thrilling story about NOUN1 and the quest for NOUN2 in a world full of danger.",
  "When a ADJ1 NOUN1 threatens everything, one hero must rise to save the day.",
  "In a ADJ1 world, a group of unlikely allies must find the NOUN1 before it is too late.",
  "A ADJ1 tale of love, betrayal, and the search for the legendary NOUN1.",
  "After discovering a ADJ1 secret, a young adventurer embarks on a journey to find the NOUN1.",
  "Two strangers are brought together by fate in this ADJ1 story about the power of NOUN1.",
  "A gripping drama about a ADJ1 NOUN1 who must confront their past to save the future.",
  "Set in a ADJ1 landscape, this film follows the journey of a NOUN1 seeking redemption.",
  "A mysterious NOUN1 appears in a small town, bringing ADJ1 consequences for everyone.",
  "When the NOUN1 is stolen, a ADJ1 detective must solve the case before time runs out.",
  "An epic adventure across ADJ1 lands in search of the legendary NOUN1.",
  "A ADJ1 NOUN1 discovers they have the power to change everything in this exciting film.",
  "In this heart-pounding thriller, a ADJ1 conspiracy threatens to destroy the NOUN1 forever.",
  "A coming-of-age story about a ADJ1 teenager who discovers the truth about the NOUN1.",
  "Deep in the ADJ1 wilderness, a lone NOUN1 fights for survival against all odds."
];

// simple function to pick a random item from an array
function pickRandom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// simple function to get a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// simple function to get a random rating between 1.0 and 10.0
function getRandomRating() {
  var rating = (Math.random() * 9 + 1).toFixed(1);
  return parseFloat(rating);
}

// keep track of used titles so we don't get duplicates
var usedTitles = {};
for (var i = 0; i < movies.length; i++) {
  usedTitles[movies[i].title] = true;
}

// Generate movies using loops until we have 1050+
var counter = 0;

// Pattern 1: "The [Adjective] [Noun]"
for (var a = 0; a < adjectives.length; a++) {
  for (var n = 0; n < nouns.length; n++) {
    if (movies.length >= 1050) break;

    var title = "The " + adjectives[a] + " " + nouns[n];

    if (usedTitles[title]) continue;
    usedTitles[title] = true;

    var desc = pickRandom(descriptionTemplates);
    desc = desc.replace("ADJ1", adjectives[a]);
    desc = desc.replace("NOUN1", nouns[n]);
    desc = desc.replace("NOUN2", pickRandom(nouns));

    movies.push({
      title: title,
      description: desc,
      release_year: getRandomNumber(1970, 2024),
      genre: pickRandom(genres),
      rating: getRandomRating(),
      duration: getRandomNumber(80, 200),
      director: pickRandom(directors)
    });
  }
  if (movies.length >= 1050) break;
}

// Pattern 2: "[Prefix] [Adjective] [Noun]" for more variety
for (var p = 0; p < titlePrefixes.length; p++) {
  for (var a2 = 0; a2 < adjectives.length; a2++) {
    if (movies.length >= 1050) break;

    var noun2 = pickRandom(nouns);
    var title2 = titlePrefixes[p] + " " + adjectives[a2] + " " + noun2;

    if (usedTitles[title2]) continue;
    usedTitles[title2] = true;

    var desc2 = pickRandom(descriptionTemplates);
    desc2 = desc2.replace("ADJ1", adjectives[a2]);
    desc2 = desc2.replace("NOUN1", noun2);
    desc2 = desc2.replace("NOUN2", pickRandom(nouns));

    movies.push({
      title: title2,
      description: desc2,
      release_year: getRandomNumber(1970, 2024),
      genre: pickRandom(genres),
      rating: getRandomRating(),
      duration: getRandomNumber(80, 200),
      director: pickRandom(directors)
    });
  }
  if (movies.length >= 1050) break;
}

// Pattern 3: "[Noun] of [Noun]" if we still need more
for (var n1 = 0; n1 < nouns.length; n1++) {
  for (var n2 = 0; n2 < nouns.length; n2++) {
    if (movies.length >= 1050) break;
    if (n1 === n2) continue;

    var title3 = nouns[n1] + " of " + nouns[n2];

    if (usedTitles[title3]) continue;
    usedTitles[title3] = true;

    var desc3 = pickRandom(descriptionTemplates);
    desc3 = desc3.replace("ADJ1", pickRandom(adjectives));
    desc3 = desc3.replace("NOUN1", nouns[n1]);
    desc3 = desc3.replace("NOUN2", nouns[n2]);

    movies.push({
      title: title3,
      description: desc3,
      release_year: getRandomNumber(1970, 2024),
      genre: pickRandom(genres),
      rating: getRandomRating(),
      duration: getRandomNumber(80, 200),
      director: pickRandom(directors)
    });
  }
  if (movies.length >= 1050) break;
}

console.log("Total movies generated: " + movies.length);

module.exports = movies;

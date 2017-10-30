const express = require( 'express' );
const path = require( 'path' );
const cons = require( 'consolidate');
const dust = require( 'dustjs-helpers' );
const pg = require( 'pg' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const Pool = require( 'pg-pool' );
const app = express()

//dbConnect
const con ={
	database: 'studentsdb',
	port: 5433,
	host: 'localhost',
	user: "edux",
	password:'1453GHFD',
	role:'superuser'
}
// view engine setup
app.engine('dust', cons.dust);
app.set('views', path.join(__dirname, 'front/views'));
app.set('view engine', 'dust');
// use favicon
app.use(favicon(path.join(__dirname, 'front', 'favicon.ico')));
app.use(logger('dev'));
//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Public folder
app.use(express.static(path.join(__dirname, 'front')));


// connections
var pool  = new Pool(con);
var client = new pg.Client(con);
client.connect();

    //connect
app.get('/', (req, res) =>  {
	return pool.query('SELECT * FROM students').then(result => {
		res.render('index',{students:result.rows})
})
.catch (e =>
	console.error("Error!"))
	
});
app.post('/add', ( req,res )=> {
	var client = new pg.Client(Pool);
	var rec = {
		name :req.body.name,
		age :parseInt(req.body.age),
		group:req.body.group
	}
		return pool.query("INSERT INTO students(name, age, st_group) VALUES($1, $2, $3)", [req.body.name, req.body.age, req.body.group]).then(result =>{
			res.redirect( '/' );
			
		})
		
	}
)
app.delete('/delete/:id', function ( req,res ) {
	return pool.query('DELETE FROM students WHERE id=$1', [req.params.id]).then(result => {
		
		res.send("DELETED");
	})
})
app.post('/edit', function ( req, res ) {
	return pool.query('UPDATE students SET name =$1, age =$2, st_group =$3 WHERE id=$4',
		[req.body.name, req.body.age, req.body.group, req.body.id ]).then(result => {
		
		res.redirect('/');
	})
})
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.listen(3000);




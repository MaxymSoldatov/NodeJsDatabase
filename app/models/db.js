const pg = require( 'pg' );
const Pool = require( 'pg-pool' );
const con ={
	database: 'studentsdb',
	port: 5433,
	host: 'localhost',
	user: "edux",
	password:'1453GHFD',
	role:'superuser'
}
module.exports=pg.model('',{
	text:String,
	done:Boolean
})
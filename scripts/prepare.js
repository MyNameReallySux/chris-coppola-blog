const { exec } = require('child_process');

console.log('Preparing Environment')

if (process.platform === 'win32' || process.platform === 'win64') {
	console.log(`handling ${process.platform} environment`)
	
	let scripts = [
		'E:\Servers\XAMPP-7.1.4\apache\bin\httpd',
		'E:\Servers\XAMPP-7.1.4\mysql\bin\mysqld'
	]
	
	exec('powershell.exe', 'echo hi', handleOutput)
}

function handleOutput(err, stdout, stderr){
	console.log('handling output')
	console.err(err)
	console.log(stdout)
	console.err(stderr)
}
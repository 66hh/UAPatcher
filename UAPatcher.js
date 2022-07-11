
//2.7.5x~?
//7408488BC3E942010000
//FDCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC40554881EC90000000488D6C245048C74518FEFFFFFF

const fs = require('fs')

try {
	let UA = Buffer.from(fs.readFileSync('UserAssembly.dll'))
	let Addr1 = UA.indexOf("7408488BC3E942010000", 0, "hex")
	let Addr2 = UA.indexOf("FDCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC40554881EC90000000488D6C245048C74518FEFFFFFF", 0, "hex") + 16
	if(UA[Addr1] == 0x74 && UA[Addr2] == 0x40){
		console.log(Addr1.toString(16) + ": 7408 -> 9090");
		console.log(Addr2.toString(16) + ": 405548 -> B001C3");
		
		UA[Addr1] = 0x90
		UA[Addr1 + 1] = 0x90
		
		UA[Addr2] = 0xB0
		UA[Addr2 + 1] = 0x01
		UA[Addr2 + 2] = 0xC3
		
		fs.writeFileSync('UserAssembly-patch.dll', UA);
		
		console.log("success");
	} else {
		console.log("fail");
	}
} catch(e) {
	console.log("fail");
}
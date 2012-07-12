// [
//   ['chrome','21']
// ]

function Support(supportData){
	
	function compareVersions(installed, required) {

		var a = installed.split('.');
		var b = required.split('.');

		for (var i = 0; i < a.length; ++i) {
			a[i] = Number(a[i]);
		}
		for (var i = 0; i < b.length; ++i) {
			b[i] = Number(b[i]);
		}
		if (a.length == 2) {
			a[2] = 0;
		}

		if (a[0] > b[0]) return true;
		if (a[0] < b[0]) return false;

		if (a[1] > b[1]) return true;
		if (a[1] < b[1]) return false;

		if (a[2] > b[2]) return true;
		if (a[2] < b[2]) return false;

		return true;
	}
	
	var name = Browser.name,
		version = Browser.version,
		browser;
	

	for(var i = 0; i<supportData.length;++i){
		browser = supportData[i].split(',');
		
		if( browser.length > 1 ){
			if(browser[0] == name && compareVersions(version+'', browser[1]+'') ){
				return true;
			}
		} else {
			if(browser[0] == name ){
				return true;
			}
		}
	}
	
	var text = 'You are using "'+name+','+version+'" this browser is not supported. For this prototype you need at least (' + supportData.join(', ') + ')';
	
	var div = new Element('div', {
		'styles':{
			'color':'#FFF'
		},
		'text':text
	});
	
	$(document.body).empty();
	document.body.appendChild(div);
	
	return false;
}

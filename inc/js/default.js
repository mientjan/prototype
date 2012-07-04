var Proto = new Class({
	
	'count':0,
	
	'dirpath':'proto/type{count}/',
	'file':'icon.jpg',
	
	'initialize':function(ul){
		this.ul = ul;
		this.directPage = location.hash.substr(1);
		if(this.directPage !== ''){
			this.directPage = parseInt(this.directPage);
		}
		this.getItem();
	},
	
	'getItem':function(){
		this.img = new Element('img', {
			'styles':{
				'width':40,
				'height':40
			}
		});
		this.img.onload = function(e){
			
			var currentCount = this.count;
			var self = this;
			var a = new Element('a', {
				'events':{
					'click':function(e){
						location.hash = currentCount;
						$('content').empty();
						this.getElements('! ! li a').removeClass('active');
						this.addClass('active');
						var iframe = new IFrame({
							'src':self.dirpath.substitute({count:currentCount}),
							'styles':{
								'border':0,
								'width':window.getSize().x,
								'height':window.getSize().y-50
							}
						});
						iframe.inject($('content'));
					}
				}
			});
			var li = new Element('li');
			
			this.img.inject(a);
			a.inject(li);
			li.inject(this.ul, 'top');
			console.log(this.directPage === this.count);
			if( this.directPage === '' ){
				clearInterval(this.delayCheck);
				this.delayCheck = (function(){
					a.fireEvent('click');
				}).delay(200, this);
			} else if( this.directPage === this.count){
				a.fireEvent('click');
			}
			
			this.count++;
			this.getItem();
			
		}.bind(this);
		
		
		this.img.src = this.dirpath.substitute({'count':this.count}) + this.file;
	}
});
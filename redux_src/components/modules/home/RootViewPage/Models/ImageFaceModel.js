/**
 * ImageFaceModel
 * 
 */

export default function ImageFaceModel(url,item){
	this.url            = url;
	this.height         = item.height;
	this.img_url_height = item.img_url_height;
	this.img_url_width  = item.img_url_width;
	this.width          = item.width;
	this.x              = item.x;
	this.y              = item.y;
}
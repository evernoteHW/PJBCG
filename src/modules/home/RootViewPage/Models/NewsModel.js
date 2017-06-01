/**
 * NewsModel
 * 
 */
import ImageFaceModel from './ImageFaceModel'

export default function NewsModel(item){
	this.key                  = item.id;
	this.a_ver                = item.a_ver;
	this.abstract             = item.abstract;
	this.alg_version          = item.alg_version;
	this.articletype          = item.articletype;
	this.chlicon              = item.chlicon;
	this.chlid                = item.chlid;
	this.chlmrk               = item.chlmrk;
	this.chlname              = item.chlname;
	this.chlsicon             = item.chlsicon;
	this.commentid            = item.commentid;
	this.flag                 = item.flag;
	this.forbid_barrage       = item.forbid_barrage;
	this.id                   = item.id;
	this.imgShowNum           = item.imgShowNum;
	if (typeof item.img_face != 'undefined') {
		var imagesFace = []
		for (let key in item.img_face){
			if (typeof key != 'undefined') {
				imagesFace.push(new ImageFaceModel(key,item.img_face[key]))
			}	
		}
		this.imagesFace = imagesFace
	}
	this.openMarks = item.openMarks;
	this.origUrl = item.origUrl;
	this.picShowType = item.picShowType;
	this.recommChannel = item.recommChannel;
	this.reward_flag = item.reward_flag;
	this.rumor_type = item.rumor_type;
	this.seq_no = item.seq_no;
	this.short_url = item.short_url;
	this.show_expr = item.show_expr;
	this.source = item.source;
	this.surl = item.surl;
	this.tag = item.tag;
	this.thumbnails = item.thumbnails;
	this.thumbnails_qqnews = item.thumbnails_qqnews;
	this.time = item.time;
	this.timestamp = item.timestamp;
	this.title = item.title;
	// this.titlePre": {
	// 	this.share": "【小摄会】"
	// 	},
	this.uin = item.uin;
	this.url = item.url;
	this.zhibo_vid = item.zhibo_vid;
}
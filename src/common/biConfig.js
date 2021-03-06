/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */
import $ from 'jquery'

const baseUrl = 'http://localhost:8080/';

export {
	baseUrl
}
/**
 * 封装Ajax请求
 * @param {*} cfg 
 * @param {*} ts 
 */
export const ajax = (cfg, ts) => {
	let o = {
		type:cfg.type,
		data:cfg.data,
		dataType:"JSON",
		xhrFields: {withCredentials: true},
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
		url:baseUrl+cfg.url,
		success:function(resp){
			if(resp.result === 1){
				cfg.success(resp);
			}else{
				ts.$notify.error({
					title: '系统出错',
					message:resp.msg,
					offset: 50
				});
			}
		},
		error: function(){
			ts.$notify.error({
				title: '系统出错',
				offset: 50
			});
		}
	};
	if(!cfg.postJSON || cfg.postJSON === false){
		delete o.contentType;
	}
	$.ajax(o);
}
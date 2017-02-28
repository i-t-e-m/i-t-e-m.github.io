"use strict"
var Util = {
	dateformat: function(date)  {
		return date.getFullYear()+"/"+
				("0"+( date.getMonth()+1 )).slice(-2)+"/"+
				("0"+date.getDate()).slice(-2)+" "+
				("0"+date.getHours()).slice(-2)+":"+
				("0"+date.getMinutes()).slice(-2)+":"+
				("0"+date.getSeconds()).slice(-2);
	},
	ajax: function(data, url, method, success, err) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			var result = document.getElementById('result');
			if(req.readyState == 4) {
				if (req.status >= 200 && req.status < 300) {
					if(success) {
						success(req.responseText);
					}
				} else {
					if(err) err(req.responseText);
				}
			}
		}
		req.open(method, url, true);
		req.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		req.send(data);
	}
};


var repository;
window.addEventListener("load", function() {
	class RepositoryController {
		constructor() {
			this.el = document.getElementById("repositories");
			this.repos = DATA.repository;
			this.inpSearch = document.getElementsByClassName("repo-search")[0];
			this.onDataRecieveCount = 0;
			this.init();
		}
		init() {
			for(var i = this.repos.length - 1; 0 <= i; i--) {
				this.repos[i] = new Repository(this, this.repos[i]);
				this.repos[i].title = this.toHalfSize(this.repos[i].title).toLowerCase();
			}
			this.inpSearch.addEventListener("keyup", this.search.bind(this));
		}
		search() {
			var words = this.toHalfSize(this.inpSearch.value).toLowerCase();
			if(words) {
				words = words.split(" ");
				for(var i = 0; i < this.repos.length; i++) {
					var flag = true;
					for(var j = 0; j < words.length; j++) {
						if(words[j].startsWith("lang:")) {
							var word = words[j].replace("lang:" ,"");
							if(this.repos[i].lang != word) flag = false;
						}
						else if(words[j].startsWith("author:")) {
							var word = words[j].replace("author:" ,"");
						 if(this.repos[i].author.indexOf(word) == -1) flag = false;
						}
						else if(words[j].startsWith("content:")) {
							var word = words[j].replace("content:" ,"");
							if(this.repos[i].content.indexOf(word) == -1) flag = false;
						}
						else { if(this.repos[i].title.indexOf(words[j]) == -1) flag = false; }
					}
					if(flag) this.repos[i].el.style.display = "block";
					else this.repos[i].el.style.display = "none";
				}
			} else {
				for(var i = 0; i < this.repos.length; i++) this.repos[i].el.style.display = "block";
			}
		}
		toHalfSize(str) {
			str = str.replace(/[！-～]/g, function(tmp) { return String.fromCharCode(tmp.charCodeAt(0) - 0xFEE0); });
			return str.replace(/”/g, "\"")
								.replace(/’/g, "'")
								.replace(/‘/g, "`")
								.replace(/￥/g, "\\")
								.replace(/　/g, " ")
								.replace(/〜/g, "~");
		}
		onDataRecieved() {
			this.onDataRecieveCount++;
			if(this.onDataRecieveCount >= this.repos.length) {
				this.sortRepositories("update", "desc");
			}
		}
		sortRepositories(key, order) {
			var i = -1;
			var j = 1;
			if(order == "desc") {
				i = 1;
				j = -1;
			}
			this.repos.sort(function(a,b){
				if( a[key] < b[key] ) return i;
				if( a[key] > b[key] ) return j;
				return 0;
			});
			for(var i = 0; i < this.repos.length; i++) this.repos[i].el.style.order = i;
		}
	}

	class Repository {
		constructor(parent, data) {
			this.parent = parent;
			this.repository = data.repository;
			this.title = data.title;
			this.lang = data.lang;
			this.content = data.content;
			this.author = data.author;
			this.update;
			this.el;
			this.els = {};
			this.createView();
		}
		createView() {
			var wrap = document.createElement("li");
			wrap.className = "repository";
			var title = document.createElement("h2");
			title.innerHTML = this.title;
			title.className = "repo_title";
			var dataWrap = document.createElement("div");
			dataWrap.className = "repo_data-wrap";
			var author = document.createElement("small");
			author.className = "repo_author";
			author.innerHTML = this.author;
			var update = document.createElement("small");
			update.className = "repo_update";
			var lang = document.createElement("p");
			lang.className = "repo_lang lang-" + this.lang;
			lang.innerHTML = DATA.language[this.lang].name;
			var btn_wrap = document.createElement("div");
			var page_btn = document.createElement("a");
			page_btn.className = "page-btn";
			page_btn.setAttribute("href", "https://" + DATA.author[this.author] + ".github.io/" + this.repository);
			page_btn.setAttribute("target", "blank");
			page_btn.innerHTML = "<span class=\"page-icon\"></span><span>page</span>";
			var repo_btn = document.createElement("a");
			repo_btn.className = "repo-btn";
			repo_btn.setAttribute("href", "https://github.com/" + DATA.author[this.author] + "/" + this.repository);
			repo_btn.setAttribute("target", "blank");
			repo_btn.innerHTML = "<span class=\"git-icon\"></span><span>repo</span>";
			var content = document.createElement("div");
			content.innerHTML = this.content;
			wrap.appendChild(title);
			wrap.appendChild(dataWrap);
			dataWrap.appendChild(lang);
			dataWrap.appendChild(author);
			wrap.appendChild(update);
			wrap.appendChild(btn_wrap);
			btn_wrap.appendChild(page_btn);
			btn_wrap.appendChild(repo_btn);
			wrap.appendChild(content);
			this.parent.el.appendChild(wrap);
			this.els.update = update;
			this.el = wrap;
			this.getRepositoryData();
		}
		setUpdate(date) {
			this.update = date;
			this.els.update.innerHTML = Util.dateformat(date);
		}
		getRepositoryData() {
			var url = "https://api.github.com/repos/" + DATA.author[this.author] + "/" + this.repository;
			var success = function(data) {
				this.setUpdate(new Date(JSON.parse(data).pushed_at));
				this.parent.onDataRecieved();
			};
			var err = function() { this.parent.onDataRecieved(); };
			Util.ajax("", url, "get", success.bind(this), err.bind(this));
		}
	}
	repository = new RepositoryController();
});
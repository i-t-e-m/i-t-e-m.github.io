"use strict"
var repository;
window.addEventListener("load", function() {
	class Repository {
		constructor() {
			this.el = document.getElementById("repositories");
			this.repos = DATA.repository;
			this.inpSearch = document.getElementsByClassName("repo-search")[0];
			this.init();
		}
		init() {
			for(var i = this.repos.length - 1; 0 <= i; i--) {
				this.repos[i].el = this.createRepo(this.repos[i]);
				this.repos[i].title = this.toHalfSize(this.repos[i].title).toLowerCase();
			}
			this.inpSearch.addEventListener("keyup", this.search.bind(this));
		}
		search() {
			var word = this.toHalfSize(this.inpSearch.value).toLowerCase();
			if(word) {
				for(var i = 0; i < this.repos.length; i++) {
					if(this.repos[i].title.indexOf(word) == -1) this.repos[i].el.style.display = "none";
					else this.repos[i].el.style.display = "block";
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
		createRepo(repo) {
			var wrap = document.createElement("li");
			wrap.className = "repository";
			var title = document.createElement("h2");
			title.innerHTML = repo.title;
			title.className = "repo_title";
			var dataWrap = document.createElement("div");
			dataWrap.className = "repo_data-wrap";
			var author = document.createElement("small");
			author.className = "repo_author";
			author.innerHTML = repo.author;
			var update = document.createElement("small");
			update.className = "repo_update";
			update.innerHTML = repo.modified;
			var page_btn = document.createElement("a");
			page_btn.className = "page-btn";
			page_btn.setAttribute("href", "https://" + DATA.author[repo.author] + ".github.io/" + repo.repository);
			page_btn.innerHTML = "<span class=\"page-icon\"></span><span>page</span>";
			var repo_btn = document.createElement("a");
			repo_btn.className = "repo-btn";
			repo_btn.setAttribute("href", "https://github.com/" + DATA.author[repo.author] + "/" + repo.repository);
			repo_btn.innerHTML = "<span class=\"git-icon\"></span><span>repo</span>";
			var content = document.createElement("div");
			content.innerHTML = repo.content;
			wrap.appendChild(title);
			wrap.appendChild(dataWrap);
			dataWrap.appendChild(author);
			dataWrap.appendChild(update);
			wrap.appendChild(page_btn);
			wrap.appendChild(repo_btn);
			wrap.appendChild(content);
			this.el.appendChild(wrap);
			return wrap;
		}
	}
	repository = new Repository();
});
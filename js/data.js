"use strict"
var DATA = {
	author: {
		yano: "yanokunpei",
		sato: "sugarnaoming",
		minakawa: "minakawa-daiki",
		nakahara: "SuguruNakahara",
		ogata: "7vk1",
		nakajima: "nakajimashunsuke"
	},
	language: {
		other: {
			name: "Other",
		},
		java: {
			name: "Java",
		},
		javaee: {
			name: "JavaEE",
		},
		scala: {
			name: "Scala",
		},
		c: {
			name: "C",
		},
		rust: {
			name: "Rust",
		},
		js: {
			name: "JavaScript",
		},
		css: {
			name: "CSS",
		},
		sass: {
			name: "Sass",
		},
	},
	repository: [
		{
			repository: "gh_pages-manual",
			title: "GitHub Pages と GitBook",
			content: "<ul style=\"list-style: disc; margin-left: 2rem;\"><li>"
				+ "GitHubに勉強会の内容を残してWebで公開したい</li>"
				+ "<li>見やすいwebページにしたい</li>"
				+ "<li>Markdownファイルを扱いたい</li></ul>"
				+ "<p>という要望に応えるために作られたマニュアルです</p>",
			author: "minakawa",
			lang: "other",
		},
		{
			repository: "scala_newbie",
			title: "Scala勉強会",
			content: "Scalaとは2003年にできた比較的新しい言語です。 SclaはJVM（Java Virtual Machine）上で動作します。また、オブジェクト指向と関数型のハイブリット言語です。",
			author: "sato",
			lang: "scala",
		},
		{
			repository: "markdown_manual",
			title: "Markdownマニュアル",
			content: "今後IT学生が簡易な文章を見やすく書く必要性に駆られるだろうことを予想し、素早く綺麗に書くことができるMarkdownの基本書式を示したマニュアルです。",
			author: "sato",
			lang: "other",
		},
		{
			repository: "nin-slider.js",
			title: "nin-slider.js",
			content: "HEWで使ったjsです。バグや要望があればITIまで。スライダーやタブを簡単に実装できます。",
			author: "yano",
			lang: "js",
		},
		{
			repository: "sass-sample",
			title: "初めてのスタイルシート言語 〜Sass〜",
			content: "Sass（サース)はハンプトン・キャトリンが設計しネイサン・バイゼンバウムが開発したスタイルシート言語です。これでフロントの開発速度向上になれば幸いです。",
			author: "minakawa",
			lang: "sass",
		},
		{
			repository: "introduction_of_Rust",
			title: "Rust入門",
			content: "RustはMozillaによって開発されている、高速に動作し、安全性、並行性、実用性にフォーカスしたシステムプログラミング言語です。"
			+ "<br>今後更新していきます。",
			author: "yano",
			lang: "rust",
		},
		{
			repository: "introduction_of_Heroku",
			title: "Heroku",
			content: "Herokuの解説、公開についてです。",
			author: "nakahara",
			lang: "other",
		},
		{
			repository: "introduction_for_python3",
			title: "自分が学んだPython3の基礎知識",
			content: "可読性が自分を成長させる言語pythonそんな言語だと思います",
			author: "nakajima",
			lang: "other",
		},
		{
			repository: "clang_gitbook",
			title: "Simply C lang ",
			content: "Be careful when using C language.",
			author: "sato",
			lang: "c",
		}
	]
};
		// {
		// 	repository: "",
		// 	title: "",
		// 	content: "",
		// 	author: ""
		// },

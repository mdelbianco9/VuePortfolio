


var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})

var list = new Vue({
	el: '#mylist',
	data: {
		lists: [
			{ item: 'Vue is kinda confusing'},
			{ item: 'But I am slowly understanding it'},
			{ item: 'can I run these answers as a for loop?'}
		]
	}
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#chat-box',
  data: {
    message: '',
    list: [""]
  },
  methods: {
    enter: function () {
      var input = document.getElementById("chat-input");
      input.addEventListener("keypress", function enterKey(e) {
      if (event.keyCode === 13) {
        
        document.getElementById("app-6").innerHTML = 'hello world';
  };
    
    }, false);


    }
    
  }
})


Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})







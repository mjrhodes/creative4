var app = new Vue({
    el: '#app',
    data: {
	newName:'',
	monday:false,
	tuesday:false,
	wednesday:false,
	thursday:false,
	friday:false,	
	schedules:{},
	employees:[],
	mondayWorkers:[],
	tuesdayWorkers:[],
	wednesdayWorkers:[],
	thursdayWorkers:[],
	fridayWorkers:[]
    },
    created: function() {
	this.getEmployees();
    },
    methods: {
	addEmployee: function() {
	    this.employees.push(this.newName);
	    this.schedules[this.newName] = [];
	    if(this.monday) this.schedules[this.newName].push("Monday");
	    if(this.tuesday) this.schedules[this.newName].push("Tuesday");
	    if(this.wednesday) this.schedules[this.newName].push("Wednesday");
	    if(this.thursday) this.schedules[this.newName].push("Thursday");
	    if(this.friday) this.schedules[this.newName].push("Friday");    
	    axios.post("/api/employees", {
		name: this.newName,
		list: this.schedules[this.newName]
	    }).then(response => {
		this.newName = '';
		this.monday = false;
		this.tuesday = false;
		this.wednesday = false;
		this.thursday = false;
		this.friday = false;
		//this.getEmployees();
		return true;
	    }).catch(err => {
	    });
	},
	clearAll: function() {
	    this.schedules = {};
	    this.employees = [];
	    this.mondayWorkers = [];
	    this.tuesdayWorkers = [];
	    this.wednesdayWorkers = [];
	    this.thursdayWorkers = [];
	    this.fridayWorkers = [];
	    axios.delete("/api/employees", {
		
	    }).then(response => {
		return true;
	    }).catch(err => {
	    });
	},
	generate: function() {
	    this.mondayWorkers = [];
	    this.tuesdayWorkers = [];
	    this.wednesdayWorkers = [];
	    this.thursdayWorkers = [];
	    this.fridayWorkers = [];
	    for(i = 0; i < this.employees.length; i++) {
		var name = this.employees[i];
		console.log(name);
		var list = this.schedules[name];
		if(list.includes("Monday")) this.mondayWorkers.push(name);
		if(list.includes("Tuesday")) this.tuesdayWorkers.push(name);
		if(list.includes("Wednesday")) this.wednesdayWorkers.push(name);
		if(list.includes("Thursday")) this.thursdayWorkers.push(name);
		if(list.includes("Friday")) this.fridayWorkers.push(name);
	    }
	},
	getEmployees: function() {
	    axios.get("/api/employees").then(response => {
		this.schedules = response.data;
		for(var name in this.schedules) {
		    this.employees.push(name);
		    console.log(this.employees);
		}
		return true;
	    }).catch(err => {
		console.log("Error");
	    });
	}
    }
});

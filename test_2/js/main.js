const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    success:false,
    lastname:null,
    name:null,
    phone:null,
    age:null,
    userGroup:[],
    city:null,
    document:null,
    ausviceDate:null,
    ip: '',
    date: '',
    phone: '',
    cpf: '',
    cnpj: '',
    cep: '',
    placa: '',
    test: ''
  },
  methods: {
    checkForm: function (e) {
      if (this.lastname && this.name && this.phone && this.age && this.userGroup && this.city && this.document && this.ausviceDate ) {
        this.success = true;
        e.preventDefault();
        return false;
      }

      this.errors = [];
      if (!this.lastname) {
        this.errors.push('Требуется указать фамилию.');
      }
      if (!this.name) {
        this.errors.push('Требуется указать имя.');
      }
      if (!this.phone) {
        this.errors.push('Требуется указать номер телефона.');
      }
      if(!this.age) {
        this.errors.push('Требуется указать дату рождения.');
      }
      if(!this.userGroup) {
        this.errors.push('Требуется указать группу клиента');
      }
      if(!this.city) {
        this.errors.push('Требуется указать город.');
      }
      if(!this.document) {
        this.errors.push('Требуется указать тип документа.');
      }
      if(!this.ausviceDate) {
        this.errors.push('Требуется указать дату выдачи документа');
      }


      e.preventDefault();
    }
  }
})
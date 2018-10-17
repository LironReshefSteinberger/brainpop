<template>
  <button class="student-preview btn flex tooltip" v-if="studentInfo" 
          v-tooltip="{ content: `name: ${student.first_name} ${student.last_name}, username: ${student.username}, age: ${student.age}`,
          classes: ['tooltip'] }">
    <ul class="student-preview-container pointer flex align-center clean-list space-between">
      <li class="colored-text student-number">{{idx + 1}}</li>
      <li class="colored-text student-first-name align-start">{{student.first_name}}</li>
      <li class="colored-text student-last-name align-start">{{student.last_name}}</li>
      <li class="align-start student-username">{{student.username}}</li>
      <button class="btn font-btn edit-btn" type="primary" @click="editStudent(student.id)">
        <font-awesome-icon icon="pen"></font-awesome-icon>
      </button>
      <edit-student v-if="studentInfo" v-show="isShowModal" @closeModal="closeModal" 
      @setInValidity="setInValidity" :studentInfo="studentInfo"></edit-student>
    </ul>
    <div v-if="!isValid" class="invalid-data-container">
      <div class="invalid-data flex column align-center justify-center">
        <h2>Invalid data !</h2>
        <h2>Changes were not saved !</h2>
        <button class="btn close-btn" @click="closeInValidMsg">CLOSE</button>
      </div>
    </div>
  </button>
</template>

<script>
import EditStudent from '@/components/EditStudent.vue';

export default {
  name: 'StudentPreview',
  components: {
    EditStudent
  },
  props: ['students', 'student', 'idx'],
  data() {
    return {
      studentInfo: null,
      isShowModal: false,
      isValid: true,
    };
  },
  created() {
    let studentId = this.student.id;
    // when student loaded from localStorage - "this.student.username" is true
    if (!this.student.username) this.getStudentInfo(studentId);
    //when student load from server - "this.student.username" is false
    else this.studentInfo = this.student;
  },

  methods: {
    getStudentInfo(studentId) {
      this.$store
        .dispatch({ type: 'getStudentInfoById', studentId })
        .then(studentInfo => {
          this.studentInfo = studentInfo;
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    editStudent(studentId) {
      this.isShowModal = !this.isShowModal;
    },
    closeModal() {
      this.isShowModal = !this.isShowModal;
    },
    setInValidity() {
      this.isValid = false;
    },
    closeInValidMsg() {
      this.isValid = true;
    }
  },
};
</script>


<style scoped lang="scss">

  .invalid-data-container {
    z-index: 10;
    width: 100%;
    height: 55%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .invalid-data {
    background-color: #f7f7f7;
    z-index: 10;
    width: rem(450px);
    height: rem(200px);
    font-family: $main-font;
    color: $main-color;
    & h2 {
      margin-bottom: rem(10px);
    }
  }

  .align-start {
    align-self: flex-start;
  }

  .student-preview {
    background-color: transparent;
    padding: 0;
    margin: 0;
  }

  .student-preview-container,
  .student-preview {
    width: 100%;
  }

  .colored-text {
    color: $main-color;
  }

  .student-number {
    width: rem(50px);
    text-align: left;
    padding-left: rem(2px);
  }

  .student-first-name,
  .student-last-name,
  .student-username {
    justify-content: flex-start;
    text-align: left;
    flex: 1;
  }

  .student-username {
    display: none;
  }

  .edit-btn {
    flex: 0 0 50px;
  }
    
  .close-btn{
    margin: rem(6px);
    width: rem(210px);
    height: rem(30px);
    border-radius: rem(2px);
    color: white;
    font-weight: bold;
    background-color: $secondary-color;
    transition: all 0.3s;
    &:hover {
      background-color: rgb(184, 80, 11);
    }
  }

  //there are some mobiles with width of 414, 411 px
  //so the media is with min-width of 415px and not 400px as asked in the assignment
  @media (min-width: 415px) {
    .student-username {
      display: inline;
    }
  }

</style>

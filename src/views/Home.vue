<template>
  <div class="app-container flex column align-center justify-center">
    <div class="home-container flex column">
      <h2 :class="{hidden: isHiddenHeader}" class="select-class-header">Please select a class</h2>
      <select class="school-class-select" v-model="selectedSchoolClassName" v-if="schoolClassesForDisplay" @change="setSchoolClass">
        <option class="checkbox" v-for="(schoolClass, idx) in schoolClassesForDisplay" :key="idx" :label="schoolClass.name" 
        :value="schoolClass.name">{{schoolClass.name}}</option>
      </select>
    </div>
    <div>
      <student-list v-show="isShowStudentList" class="student-list-container" :students="studentsForDisplay"></student-list>
    </div>
  </div>
</template>


<script>
import StudentList from '@/components/StudentList.vue';
import StudentService from '@/services/StudentService.js';
import SchoolClassService from '@/services/SchoolClassService.js';


export default {
  name: 'home',
  components: {
    StudentList
  },
  data() {
    return {
      selectedSchoolClassName: null,
      isShowStudentList: false,
      isHiddenHeader: false,
    };
  },
  created() {
    this.isHiddenHeader = false;
    this.loadSchoolClasses()
      .then(() => {
        //first check if there is currState in the localStorage
        this.getCurrState();
      })
  },
  computed: {
    schoolClassesForDisplay() {
      return this.$store.getters.schoolClassesForDisplay;
    },
    schoolClass() {
      return this.$store.getters.schoolClass;
    },
    studentsForDisplay() {
      if (this.$store.getters.studentsForDisplay.length !== 0) {
        this.isShowStudentList = true;
        this.isHiddenHeader = true;
      }
      return this.$store.getters.studentsForDisplay;
    },
  },
  methods: {
    getCurrState() {
      var currState = StudentService.getCurrState();
      if (currState) {
        this.selectedSchoolClassName = currState.schoolClass.name;
        this.$store.commit({ type: 'setSchoolClass', schoolClassName: currState.schoolClass.name })
        this.$store.commit({ type: 'setFilter', filterBy: currState.filterBy })
        this.$store.commit({ type: 'setSortBy', sortBy: currState.sortBy })
        this.$store.dispatch({ type: 'loadStudents', schoolClass: currState.schoolClass });
      }
    },
    loadSchoolClasses() {
      return this.$store.dispatch({ type: 'loadSchoolClasses' }).catch(err => {
            console.log('err', err);
          });
    },
    setSchoolClass() {
      //reset filter
      this.$store.commit({ type: 'setFilter', filterBy: { name: '' }});
      if (this.selectedSchoolClassName) {
        var schoolClassName = this.selectedSchoolClassName;
      }
      this.$store
        .dispatch({ type: 'setSchoolClass', schoolClassName })
        .then(() => {
          var schoolClassId = this.schoolClass.id;
          this.$store.dispatch({ type: 'loadStudents', schoolClass: { id: schoolClassId, name: schoolClassName }});
        });
    },
  }
};
</script>

<style scoped lang="scss">

  .home-container {
    width: 60vw;
    background-color: white;
  }

  .select-class-header {
    margin-top: rem(20px);
    color: $secondary-color;
    font-family: $main-font;
    font-size: rem(20px);
  }

  .school-class-select {
    width: 50vw;
    height: rem(30px);
    border-radius: rem(4px);
    background-color: $main-color;
    color: white;
    padding-left: rem(5px);
    margin: rem(15px);
    font-family: $main-font;
  }

  .student-list-container {
    width: 60vw;
  }

  .hidden {
    visibility: hidden;
  }

  @media (min-width: 420px) {
    .school-class-select {
      width: rem(250px);
      width: 35vw;
    }
  }

  @media (min-width: 600px) {
    .select-class-header {
      font-size: rem(30px);
    }
  }

  @media (min-width: 770px) {
    .school-class-select {
      width: rem(430px);
    }
  }

</style>

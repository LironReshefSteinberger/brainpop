<template>
  <div class="filter-students-container flex column justify-center align-center" v-if="students">
    <student-filter></student-filter>
    <div class="students-table-container container flex column space-between">
        <div class="students-table-headers-container container flex">
          <h3 class="header-number"></h3>
          <h3 class="btn sort-btn sort-first-name-btn pointer header-first-name" 
          @click="setSortBy(newSortedColumnName = 'firstName')">First Name</h3>
          <h3 class="btn sort-btn sort-last-name-btn pointer header-last-name" 
          @click="setSortBy(newSortedColumnName = 'lastName')">Last Name</h3>
          <h3 class="header-username">Username</h3>
          <h3></h3>
        </div>
        <transition-group class="students-container flex column" name="flip-list" tag="ul">
          <div class="student-preview" v-for="(student, idx) in students" :key="student.id">
            <student-preview :students="students" :student="student" :idx="idx"></student-preview>
          </div>
        </transition-group>
    </div>
    <button class="btn font-btn download-btn" @click="csvExport(csvData)">
      <font-awesome-icon icon="download" />
    </button>
  </div>
</template>

<script>
import StudentPreview from '@/components/StudentPreview.vue';
import StudentFilter from '@/components/StudentFilter.vue';

export default {
  name: 'StudentList',
  props: ['students'],
  components: {
    StudentPreview,
    StudentFilter,
  },
  data() {
    return {
      sortBy: {
        columnName: '',
        isAsc: false,
      },
    }
  },
  computed: {
    schoolClass() {
      return this.$store.getters.schoolClass;
    },
    studentsForCsv() {
      var students = JSON.parse(JSON.stringify(this.$store.getters.studentsForDisplay));
      var updatedStudents = students.map((student, idx) => {
        var updatedStudent = {};
        updatedStudent.serialNum = idx + 1;
        updatedStudent.first_name = student.first_name,
        updatedStudent.last_name = student.last_name,
        updatedStudent.username = student.username
        return updatedStudent;
      });
      return updatedStudents;
    },
    csvData() {
      return this.studentsForCsv.map(student => ({
        ...student,
      }));
    },
  },
  methods: {
    setSortBy(newSortedColumnName) {
      this.sortBy = JSON.parse(JSON.stringify(this.$store.state.StudentModule.sortBy));      
      // same sorted column
      if (this.newSortedColumnName === this.sortBy.columnName) {
        //do toggle
        this.sortBy.isAsc = !this.sortBy.isAsc;
      } else {
      // new sorted column name
          this.sortBy.columnName = this.newSortedColumnName;
          this.sortBy.isAsc = true;
      }
        this.$store.commit({ type: 'setSortBy', sortBy: this.sortBy })
    },
    
    csvExport(arrData) {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [
        Object.keys(arrData[0]),
        ...arrData.map(item => Object.values(item))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');
      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'students_list.csv');
      link.click();
    }
  },
};
</script>

<style scoped lang="scss">

  .filter-students-container {
    width: 70vw;
    background-color: white;
    padding-bottom: rem(20px);
  }

  .students-table-container {
    width: 100%;
    font-family: $secondary-font;
    margin-bottom: rem(30px);
  }

  .students-container {
    width: 100%;
  }

  .students-table-headers-container {
    color: $table-header-main-color;
    margin-bottom: rem(20px);
    width: 100%;
    font-size: 12px;
    padding: 0 50px;
  }

  .header-first-name, .header-last-name, .header-username {
    flex: 1;
    text-align: left;
  }

  .header-username {
      display: none;
  }

  .sort-btn {
    transition: all 0.3s;
    &:hover {
      color: $secondary-color;
      box-shadow: 0px rem(2px) $secondary-color;
    }
  }

  .student-preview {
    font-weight: 700;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .download-btn {
    font-size: rem(25px);
    margin-top: rem(30px);
  }

  //there are some mobiles with width of 414, 411 px
  //so the media is with min-width of 415px and not 400px as asked in the assignment
  @media (min-width: 415px) {
    .students-table-headers-container  {
      font-size: rem(16px);
    }

    .header-username {
      display: inline;
    }

    .filter-students-container {
      padding-right: rem(20px);
    }
  }

</style>

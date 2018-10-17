<template>
    <div class="edit-modal-container" :class="{ bgColor: isShowModal }" @click="closeModal">
        <div @click.stop class="edit-student" v-show="isShowModal" :class="{ show: isShowModal }">
            <ul class="edit-student-container pointer flex column align-center" v-if="studentInforCopy">
                <li class="edit-student-header">
                    <h2>Edit Student</h2>
                </li>
                <li class="form-group">
                    <h3 for="user name">Student username*</h3>
                    <input type="text" v-model="studentInforCopy.username" v-validate="{ required: true, max: 20 }" 
                    name="user name" class="form-control edit-input" :class="{ 'is-invalid': errors.has('user name') }" autofocus />
                    <div v-if="errors.has('user name')" class="invalid-feedback">{{ errors.first('user name') }}</div>
                </li>
                <!-- note: passward doesn't appear in api, passward used here as text only, not using v-model -->
                <li class="form-group">
                    <h3>Student password</h3>
                    <input class="edit-input edit-input-password" type="password" placeholder="Password" />
                </li>
                <li class="form-group">
                    <h3>Repeat student password</h3>
                    <input class="edit-input edit-input-password" type="password" placeholder="Password" />
                </li>
                <li class="form-group">
                    <h3 for="first name">Student first name*</h3>
                    <input type="text" v-model="studentInforCopy.first_name" v-validate="{ required: true, alpha: 6 }" 
                    name="first name" class="form-control edit-input" :class="{ 'is-invalid': errors.has('first name') }" />
                    <div v-if="errors.has('first name')" class="invalid-feedback">{{ errors.first('first name') }}</div>
                </li>
                <li class="form-group">
                    <h3 for="last name">Student last name*</h3>
                    <input type="text" v-model="studentInforCopy.last_name" v-validate="{ required: true, alpha: 6 }" 
                    name="last name" class="form-control edit-input" :class="{ 'is-invalid': errors.has('last name') }" />
                    <div v-if="errors.has('last name')" class="invalid-feedback">{{ errors.first('last name') }}</div>
                </li>
                <li class="form-group">
                    <h3 for="age">Age</h3>
                    <input type="text" v-model="studentInforCopy.age" v-validate="{ required: true, numeric: true, max: 3 }" 
                    name="age" class="form-control edit-input" :class="{ 'is-invalid': errors.has('age') }" />
                    <div v-if="errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
                </li>
                <li class="btns-container flex justify-center align-center">
                    <button class="btn cancel-btn" @click="cancelSaving">CANCEL</button>
                    <button class="btn save-btn" @click="saveStudentInfo(studentInfo.id)">SAVE</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name: 'ShowModal',
    components: {
        
        },
    props: ['studentInfo'],
    data() {
        return {
            isShowModal: true,
            studentInforCopy: null,
        };
  },
    created() {
        this.studentInforCopy = JSON.parse(JSON.stringify(this.studentInfo));
    },

    methods: {
        cancelSaving() {
            this.studentInforCopy = JSON.parse(JSON.stringify(this.studentInfo));
            this.closeModal();
        },
        saveStudentInfo() {
            if (this.errors.items.length === 0) {
                this.$store.commit({ type: 'setStudentInfo', studentInfo: this.studentInforCopy });
            } else if (this.errors.items.length > 0){
                this.studentInforCopy = JSON.parse(JSON.stringify(this.studentInfo));
                this.$emit('setInValidity');
            }
            this.closeModal();
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
};
</script>


<style scoped lang="scss">

    .bgColor {
        background-color: #000000c9;
        width: 100%;
        height: 100%;
        z-index: 7;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .show {
        width: 100vw;
        height: 100vh;
        z-index: 7;
    }

    .edit-student {
        // width: rem(500px);
        // height: rem(700px);
        border: 1px solid $border-color;
        background-color:  rgb(247, 247, 247);
        font-family: $secondary-font;
    }

    .edit-student, .edit-student-header {
        border-top-left-radius: rem(6px);
        border-top-right-radius: rem(6px);
    }

    .edit-student-header {
        width: 100%;
        height: rem(50px);
        background-color: white;
        border-bottom: 1px solid $border-color;
        & h2 {
            font-size: rem(15px);
            font-weight: normal;
            padding: rem(15px);
            text-align: left;
        }
    }

    .form-group, .edit-student-header {
        margin-bottom: rem(22px);
    }

    .edit-student-container {
        padding: 0 rem(50px);
    }

    .form-group {
        // padding: 0 rem(50px);
        & h3 {
            margin-bottom: rem(8px);
            text-align: left;
            font-size: rem(15px);
        }
        & input {
            color: grey;
            font-size: rem(14px);
            padding: rem(7px);
        }
    }

    .edit-input {
        border-radius: rem(4px);
        border: 1px solid rgb(204, 204, 204);
        padding: rem(5px);
        width: 100%;
    }

    .edit-input-password, .form-group h3 {
        font-family: $main-font;
    }

    .form-group, .btns-container {
        width: 92%;
    }

    .btns-container {
        background-color: white;
        height: rem(60px);
        & button {
            margin: rem(6px);
            width: rem(210px);
            height: rem(30px);
            border-radius: rem(2px);
            color: white;
            font-weight: bold;
        }
    }

    .invalid-feedback {
        color: red;
        font-size: rem(14px);
        text-align: left;
        padding-top: rem(2px);
        font-weight: 500;
    }

    .cancel-btn {
        background-color: rgb(151, 150, 150);
        transition: all 0.3s;
        &:hover {
            background-color: rgb(116, 115, 115);
        }
    }

    .save-btn {
        background-color: $secondary-color;
        transition: all 0.3s;
        &:hover {
            background-color: rgb(184, 80, 11);
        }
    }

    @media (min-width: 420px) {
        .edit-student-container {
            padding: 0;
        }

        .edit-student {
            width: rem(500px);
            height: rem(700px);
        }
    }

</style>

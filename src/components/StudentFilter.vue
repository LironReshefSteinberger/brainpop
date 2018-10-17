<template>
    <div class="filter-container flex flex-start ">
        <form @submit.prevent="setFilter" class="search flex">
            <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for students" autofocus/>
            <button class="btn search-btn" @click="setFilter">
                <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'StudentFilter',
    components: {},
    data() {
        return {
            filterBy: {
                name: '',
            },
        };
    },
    created() {
        this.filterBy = JSON.parse(
        JSON.stringify(this.$store.state.StudentModule.filterBy)
        );
    },
    computed: {
        updatedFilter() {
            return this.$store.getters.setFilter;
        },
    },
    methods: {
        setFilter() {
            var filterBy = JSON.parse(JSON.stringify(this.filterBy));
            this.$store.commit({ type: 'setFilter', filterBy })
        },
    },
    watch: {
        updatedFilter(newFilter) {
            this.filterBy = JSON.parse(JSON.stringify(newFilter));
        }
    }
};
</script>

<style scoped lang="scss">

    .filter-container {
        margin-top: rem(20px);
        margin-bottom: rem(30px);
    }

    .search-input {
        border: 1px solid $border-color;
        height: rem(30px);
        width: 40vw;
        font-size: rem(14px);
        border-top-left-radius: rem(4px);
        border-bottom-left-radius: rem(4px);
        padding-left: rem(5px);
    }

    .search-btn {
        width: rem(40px);
        border-top-right-radius: rem(4px);
        border-bottom-right-radius: rem(4px);
        background-color: $main-color;
        color: white;
    }
    
    @media (min-width: 420px) {
        .search-input {
            width: 20vw;
            font-size: rem(16px);
        }
    }

</style>
<template>
  <div>
    <Header />
    <TodosBlock />
  </div>
</template>

<script>
import Header from "../components/Header";
import TodosBlock from "../components/TodosBlock";
export default {
  name: "Main",
  components: { Header, TodosBlock }
}
</script>

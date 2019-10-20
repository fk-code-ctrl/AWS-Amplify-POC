const TODOS = [
  {id: "1",name: "Wake up at 4AM"},
  {id: "2",name: "Office  at 9AM"},
  {id: "3",name: "Sleep  at 10PM"}
];

function getTodos(){
  return TODOS;
}

function getTodosById(id){
  return TODOS.filter(todo => todo.id === id);
  }

const resolvers = {
  Query: {
    todos: () => {
      return getTodos();
    },
    getTodo: (ctx) => {return getTodosById(ctx.argument.id)
    }
  }  
}

exports.handler = async (event) => {
  const typeHandler = resolvers [event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      var result = await resolver (event);
      console.log(result);
      return result;
    }  
  }

  throw new Error("Resolver not found.");
};
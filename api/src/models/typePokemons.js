const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type_pokemons', {
    pokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    typeId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        
    }

  
  });
};




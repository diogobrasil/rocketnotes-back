const knex = require("../database/knex");

class NotesController {
  async create( request, response ) {
    const {title, description, tags, links} = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert(
      {
        title,
        description,
        user_id
      }
    );

    const linksInsert = links.map( link => 
      {
        return {
          note_id,
          url : link
        }
      }
    );

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map( name => 
      {
        return {
          note_id,
          name,
          user_id
        }
      }
    );

    await knex("tags").insert(tagsInsert);

    response.json();

  }

  async show ( request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({id}).first();
    const tags = await knex("tags").where({ note_id : id }).orderBy("name");
    const links = await knex("links").where({ note_id : id }).orderBy("created_at");

    response.json(
      {
        ...note,//Decompõe o conteudo de note no objeto JSON.
        tags,
        links
      }
    );
  }

  async delete ( request, response ) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    response.json();
  }

  async index ( request, response ) {
    const { user_id, title, tags } = request.query;

    let notes;

    if(tags) {

      const filterTags = tags.split(',').map( tag => tag.trim());

      notes = await knex("tags")
        .select(
          [
            "notes.id",
            "notes.title",
            "notes.user_id",
            "name"
          ]
        )
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)//Busca pelo campo informado numa lista de valores.
        .innerJoin("notes","notes.id","tags.note_id")
        .orderBy("notes.title");
  
    }else {

      notes = await knex("notes")
        .where({ user_id })//Retorna a nota que possui exatamente o id informado.
        .whereLike("title", `%${title}%`)//Busca por correspondências entre o valor informado e o valor do campo.
        .orderBy("title");

    }

    response.json(notes);
  }
}

module.exports = NotesController;


exports.up = function(knex) {
  return (
      knex.schema.createTable('projects', tbl => {
        tbl.increments();
        tbl.string('project-name', 50).notNullable();
        tbl.string('project-description', 255);
        tbl.boolean('completed').notNullable().defaultTo(false)
      })
      .createTable('tasks', tbl => {
          tbl.increments();
          tbl.string('task-name', 50).notNullable();
          tbl.string('task-notes', 255);
          tbl.boolean('completed').notNullable().defaultTo(false);
          tbl.integer('project-id')
            .unsigned()
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
      })
      .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('resource-name', 50).notNullable;
        tbl.string("resource-description", 255);
      })
      .createTable('project-resources', tbl => {
          tbl.integer('project-id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl.integer('resource-id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl.primary(['project-id', 'resource-id']);

      })
  );
};

exports.down = function(knex) {
    return(
        knex.schema
            .dropTableIfExists('project-resources')
            .dropTableIfExists('resources')
            .dropTableIfExists('tasks')
            .dropTableIfExists('projects')
    );
  
};

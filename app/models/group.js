//Group.hasMany(Role, {as: 'roles', foreignKey: 'roleId'});
Group.hasAndBelongsToMany(Role, {as: 'roles', through: GroupRoles});
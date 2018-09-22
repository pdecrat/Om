import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/api/Spaces/Spaces';
import Blocks from '/imports/api/Blocks/Blocks';
import { Collections, Collection } from '/imports/api/Collections';

Meteor.startup(() => {
  Spaces.find().forEach(space => {
    const collection = new Collection(space._id);

    collection.rawCollection().drop();
  });
  Spaces.remove({})
  if (Spaces.find().count() === 0) {
    const omId = Spaces.insert({
      name: 'om',
      type: 'space',
    });
    const { content, name } = Blocks.findOne({
      name: "BlockManager"
    });
    Collections.get(omId).insert({
      ...content,
      name,
      type: 'block',
      isActive: true,
    })
  }
})

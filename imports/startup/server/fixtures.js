import { Meteor } from 'meteor/meteor';

import Spaces from '/imports/api/Spaces/Spaces';
import Blocks from '/imports/api/Blocks/Blocks';
import Content from '/imports/api/Content/Content';

Meteor.startup(() => {
  Meteor.users.update({}, {
    $set: { spaces: [] }
  },{ multi: true })
  Spaces.remove({})
  Content.remove({})
  if (Spaces.find().count() === 0) {
    const parentId = Spaces.insert({
      name: 'om',
      type: 'space',
    });
    const { content, name } = Blocks.findOne({
      name: "BlockManager"
    });
    Content.insert({
      ...content,
      parentId,
      name,
      type: 'block',
      isActive: true,
    })
  }
})

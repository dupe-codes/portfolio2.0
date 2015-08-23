#!/usr/bin/env python

# Dynamically generates a clientside credentials configuration
# file
#
# Realized trying to hide clientside API keys and such is silly since
# they're exposed with a simple 'view source,' but the 15 minutes of work
# here at least means I can easily update keys just by changing
# environment variables...

import os
from jinja2 import Environment, FileSystemLoader

if __name__ == '__main__':
  print 'Writing out clientside credentials file...'

  client_dir = os.path.join(os.path.dirname(__file__), '../src/client/')
  credfile_template = Environment(
    loader=FileSystemLoader(client_dir)
  ).get_template('clientConfig.js.jinja')

  with open(os.path.join(client_dir, 'clientConfig.js'), 'w+') as outfile:
    outfile.write(credfile_template.render(
      mapboxAPIToken=os.environ.get('MAPBOX_API_TOKEN', 'dummy'),
      mapboxMapID=os.environ.get('MAPBOX_MAPID', 'dummy')
    ))

  print 'Done creating file cliendConfig.js in {}'.format(client_dir)

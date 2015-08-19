import React from 'react';

// TODO: Replace item text with image/logo
export default class Navbar extends React.Component {
  render () {
    return (
      <div>
        <nav className='top-bar' data-topbar role='navigation'>
          <ul className='title-area'>
            <li className='name'>
              <h1><a href='#'>@njdup</a></h1>
            </li>
          </ul>

          <section className='top-bar-section'>
            <ul className='right'>
            { this.props.items.map(function(item, index) {
              return <li key={index}><a href={item.link}>{item.text}</a></li>
            }) }
            </ul>
          </section>
        </nav>
      </div>
    );
  }
}

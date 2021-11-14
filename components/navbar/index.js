import React from 'react';
import Link from 'next/link';
function Navbar() {
  const [scroll, setScroll] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScroll(!scroll);
      return;
    }
    setScroll(false);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`${scroll && 'nav-box-shadow'} navbar navbar-expand-lg px-4 py-4`}>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <i className='fas fa-bars'></i>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <a className='navbar-brand' href='/'>
              <img src='img/logo.svg' height='15' alt='' loading='lazy' />
            </a>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item mx-4'>
                <a className='nav-link' href='#'>
                  Earn
                </a>
              </li>
              <li className='nav-item mx-4'>
                <a className='nav-link disabled' href='#'>
                  Governance
                </a>
              </li>
              <li className='nav-item dropdown mx-4'>
                <a
                  className='nav-link dropdown-toggle'
                  href='/'
                  id='navbarDropdownMenuLink'
                  role='button'
                  data-mdb-toggle='dropdown'
                  aria-expanded='false'>
                  Social
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <li>
                    <a className='dropdown-item' href='https://twitter.com/_eternalfinance'>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='https://www.reddit.com/r/Eternal_Finance/'>
                      Reddit
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='https://t.me/eternalfinance'>
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='https://medium.com/@eternal.finance'>
                      Medium
                    </a>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown mx-4'>
                <a
                  className='nav-link dropdown-toggle'
                  href='/'
                  id='navbarDropdownMenuLink'
                  role='button'
                  data-mdb-toggle='dropdown'
                  aria-expanded='false'>
                  Info
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='https://docs.eternal.market'>
                      Documentation
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button className='btn theme-btn top-nav-btn'>Connect Wallet</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

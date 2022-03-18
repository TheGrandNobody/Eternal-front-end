import { Button } from "@mui/material";

function HomeButton({ text, handleClick }) {
    return (
        <Button className="btn" onClick={handleClick} sx={{
            borderRadius: '60px',
            height: '39px',
            fontSize: '14px',
            fontWeight: 'bold',
            minWidth: '305px',
            textTransform: 'inherit',
            background: '#c35c6c',
            padding: 0,
            color: '#fff',
            transition: 'all 0.4s',
            ':hover': {
              background: '#fff',
              color: '#c35c6c',
            }
          }}>{text}</Button>
    )
};

export default HomeButton;
import {
    List,
    ListItem,
    ListItemText,
    Typography
  } from '@mui/material';
import {useEffect, useRef} from 'react'
import Image from 'components/Image/index';
import { clickOutSide } from 'utils/commonFunctions';

const SearchValue = ({ setSearchValue, setopenSearchBox }) => {
    const boxSearchRef = useRef(null);

    //Catch the click event outside the search value box
    useEffect(() => {
        if(boxSearchRef.current)
        clickOutSide(boxSearchRef, setopenSearchBox)
    }, [])

    const fakeDataSeach = [
        {   
            image: '',
            name: "Papa's Herb Forbidden Fruit 0.5g Cartridge",
            stock: 1 
        },
        {
            image: '',
            name: "Halara Banana Mango 1g Live Diamond Sauce Cartridge",
            stock: 2
        },
        {
            image: '',
            name: "Zengaz Lighters",
            stock: 3
        },
        {
            image: '',
            name: "Kure Red Frost Racerback Women's Tank",
            stock: 4
        },
        {
            image: '',
            name: "Eagle Torch Gun",
            stock: 5 
        }
    ]
    return ( 
        <List 
            ref={boxSearchRef}
            sx={{
                width: { xs: '300px', md: '400px'},
                p: 0,
                top: '120%',
                left: { xs: '-20%', sm: 0 },
                bgcolor: '#414242',
                position: 'absolute',
                borderRadius: '10px',
                color: '#f7f7f7',
                zIndex: '99999999'
            }}
        >
            {fakeDataSeach.map((data, index) => (
                    <ListItem 
                        key={index}
                        onClick={() => {
                            setSearchValue(data.name)
                            setopenSearchBox(false)
                        }}
                        sx={{
                            p: '16px',
                            cursor: 'pointer',
                            gap: '12px',
                            alignItems: 'flex-start',
                            ':hover': { bgcolor: '#32BEB9', borderRadius: '10px' } }}>
                        <Image alt="" src={data.image} height="100%" width="100%" sx={{ flex: 1 }}/>
                        <ListItemText
                            sx={{ flex: 2, '.MuiTypography-root':{ fontSize: '1rem'} }}
                            primary={data.name}
                            secondary={
                                <>
                                    <Typography
                                        sx={{fontWeight: 'bolder', fontSize: '1rem', color: "#f7f7f7" }}
                                        component="span"
                                        children="Stock:"
                                    />
                                    <Typography
                                        sx={{ fontSize: '1rem', color: "#f7f7f7" }}
                                        component="span"
                                        children={data.stock}
                                    />
                                </>
                            }
                        />
                    </ListItem>
            ))}
         
        </List>
    )
}

export default SearchValue;
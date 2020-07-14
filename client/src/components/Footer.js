import React from 'react'
import {Main, Text, Box, Footer as Foo} from 'grommet'
import {Github} from 'grommet-icons'
export default function Footer() {
    return (
        <>
      <Foo style={{position: 'fixed', left: '0', bottom: '0', width: '100%'}} background="dark-1" pad="small">
        <Box align="center" direction="row" gap="xsmall">
          <Text alignSelf="center" color="brand" size="small">
            Mnemo
          </Text>
        </Box>
       <a target="_blank" href="https://github.com/WaldemarKarasik/react-mnemo"> <Github style={{cursor: 'pointer'}}/></a>
        <Text textAlign="center" size="xsmall">
          ©Copyright
        </Text>
      </Foo>
      </>
    )
}

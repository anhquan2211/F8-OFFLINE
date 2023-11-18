import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white',
  },
  '&:hover': {
    bgcolor: 'primary.50',
  },
}

function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLES}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                bgcolor: '#a4b0be',
              },
            },
          }}
        >
          <Tooltip title="hoanganunicode">
            <Avatar
              alt="Hoanganunicode"
              src="https://yt3.googleusercontent.com/8xVsdl1GgIFN5DxzVpbysvsnG6WtzvgRUk6-QdpH4aYAuqVaaLysEB3libBBHnuo_icTHsX4Bg=s176-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/200" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/300" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/250" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/220" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/210" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/240" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/280" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/290" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/251" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/236" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/222" />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar alt="Avatar" src="https://picsum.photos/228" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

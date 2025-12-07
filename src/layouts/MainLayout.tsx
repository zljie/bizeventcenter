import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, theme } from 'antd'
import {
  DashboardOutlined,
  FileTextOutlined,
  SendOutlined,
  BellOutlined,
  FileSearchOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const menuItems = [
  {
    key: '/subjects',
    icon: <FileTextOutlined />,
    label: <Link to="/subjects">消息主题登记</Link>,
  },
  {
    key: '/events',
    icon: <SendOutlined />,
    label: <Link to="/events">事件发布中心</Link>,
  },
  {
    key: '/subscriptions',
    icon: <BellOutlined />,
    label: <Link to="/subscriptions">事件订阅中心</Link>,
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">系统设置</Link>,
  }
]

const breadcrumbNameMap: Record<string, string> = {
  '/dashboard': '仪表板',
  '/subjects': '消息主题登记',
  '/events': '事件发布中心',
  '/subscriptions': '事件订阅中心',
  '/logs': '业务事件日志',
  '/settings': '系统设置',
  '/requirements': '需求总纲',
}

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return {
      key: url,
      title: breadcrumbNameMap[url] || url,
    }
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? 14 : 18,
            fontWeight: 600,
          }}
        >
          {collapsed ? '事件中心' : '企业事件中心'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                console.log('Toggle collapsed:', !collapsed)
                setCollapsed(!collapsed)
              }}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
              {breadcrumbItems.map((item, index) => (
                <span key={item.key}>
                  {index > 0 && <span style={{ margin: '0 8px' }}>/</span>}
                  <span>{item.title}</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#666' }}>
            企业中间件业务事件管理平台
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

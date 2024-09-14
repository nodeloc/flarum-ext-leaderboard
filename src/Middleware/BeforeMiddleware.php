<?php
/*
 * Modified foskym/flarum-sorts-for-user-directory.
 *
 * Copyright (c) 2024 FoskyM.
 * Copyright (c) 2024 小鱼飘飘
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace Nodeloc\LeaderBoard\Middleware;

use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class BeforeMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $path = $request->getUri()->getPath();
        if ($path === '/users') {
            $sort = Arr::get($request->getQueryParams(), 'sort');
            if ($sort === "-lastCheckinMoney") {
                $request = $request->withAttribute('user-directory.sort', $sort);
                $_REQUEST['user-directory.sort'] = $sort;
            }
        }

        return $handler->handle($request);
    }
}
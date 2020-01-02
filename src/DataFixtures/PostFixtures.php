<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class PostFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $difficulties = ['Facile', 'Intermédiaire', 'Diffcile'];
        $faker = Factory::create('fr_FR');
        /**
         * Création des postes
         */


        for ($j = 0; $j < 100; $j++) {
            $reference = "user" . rand(0, 9);

            $post = new Post();
            $post->setTitle($faker->word())
                ->setDescription($faker->sentence())
                ->setDifficulty($difficulties[rand(0, count($difficulties) - 1)])
                ->setHref("https://www.youtube.com/watch?v=GbvwyxW2WOA&list=PLDTlf-v8f7V_MLKfR61mOOLKqQQ2IS6_-&index=195")
                ->setUser($this->getReference('user' . rand(0, 9)));
            $manager->persist($post);

            $this->addReference("post" . $j, $post);
        }


        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
